import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Colors,
  Divider,
  HelperText,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import {postCheckUsername, postRegister} from '../../api/accountApi';
import {RegisterPayload} from '../../api/payload/RegisterPayload';
import {BaseResponse} from '../../api/response/BaseResponse';
import {User} from '../../models/User';
import {accoutSlice} from '../../redux/AccountSlice';
import {useAppDispatch} from '../../redux/hook';
import {snackbarSlice} from '../../redux/SnackbarSlice';
import {margins, styles} from '../../styles/styles';
import {saveSession} from '../../utils/storage/UserSession';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isSubmitted, setSubmitted] = React.useState<boolean>(false);
  const [isCheckingUsername, setCheckingUsername] =
    React.useState<boolean>(false);
  const [isUsernameAvailable, setUsernameAvailable] =
    React.useState<boolean>(false);
  const [username, setUsername] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConf, setPasswordConf] = React.useState('');
  let usernameValue = '';

  const submitForm = async () => {
    setSubmitted(true);
    if (isValidForm()) {
      setLoading(true);
      registering();
      console.log('submitForm', username, password);
    }
  };

  const registering = async () => {
    let result = await dispatch(
      postRegister(new RegisterPayload(username, fullname, password)),
    );
    let response = result.payload as BaseResponse<string>;
    if (response.success) {
      let user = new User(username, fullname);
      await Promise.all([
        dispatch(accoutSlice.actions.updateUserState(user)),
        await saveSession(response.data, user),
        dispatch(snackbarSlice.actions.info(`Welcome ${user.fullname}`)),
      ]);
      resetForm();
    } else {
      dispatch(snackbarSlice.actions.error(response.message));
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setUsername('');
    setFullname('');
    setPassword('');
    setPasswordConf('');
    setLoading(false);
  };
  const TYPEDELAY = 1000;

  const onUsernameChanged = async (value: string) => {
    setUsername(value);
    usernameValue = value;
    setUsernameAvailable(false);
    if (value.length > 0) {
      setCheckingUsername(true);
      setTimeout(async () => {
        console.log('checkUsername', username, usernameValue, value);
        if (usernameValue === value) {
          let result = await dispatch(postCheckUsername(value));
          console.log(result);
          let response = result.payload as BaseResponse<boolean>;
          setUsernameAvailable(response.data);
          setCheckingUsername(false);
        }
      }, TYPEDELAY);
    } else {
      setCheckingUsername(false);
    }
  };

  const isEmptyUsername = (): boolean => {
    return username.length === 0;
  };

  const showUsernameError = (): boolean => {
    return !isEmptyUsername() && !isCheckingUsername && !isUsernameAvailable;
  };

  const isEmptyFullname = (): boolean => {
    return fullname.length === 0;
  };

  const isEmptyPassword = (): boolean => {
    return password.length === 0;
  };

  const isEmptyPasswordConf = (): boolean => {
    return passwordConf.length === 0;
  };

  const isIncorectPasswordConf = (): boolean => {
    return passwordConf.length > 0 && password !== passwordConf;
  };

  const isErrorPasswordConf = (): boolean => {
    return isIncorectPasswordConf() || (isSubmitted && isEmptyPasswordConf());
  };

  const usernameWidget = () => {
    if (!isCheckingUsername && !isEmptyUsername() && isUsernameAvailable) {
      return <TextInput.Icon name="check" color={Colors.green500} />;
    }
    return <View />;
  };

  const isValidForm = (): boolean => {
    return isUsernameAvailable && !isEmptyFullname() && !isEmptyPassword();
  };
  return (
    <ScrollView style={[styles.fullWidth]}>
      <Title style={[styles.alignCenter]}>Register</Title>
      <Divider style={margins.v3} />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          label="Username"
          value={username}
          style={styles.fullWidth}
          error={showUsernameError()}
          onChangeText={async newValue => await onUsernameChanged(newValue)}
          right={usernameWidget()}
        />
        {isCheckingUsername && (
          <ActivityIndicator
            style={{marginLeft: -30}}
            animating={true}
            color={Colors.blueA700}
          />
        )}
      </View>
      <HelperText type="error" visible={showUsernameError()}>
        username has been taken
      </HelperText>
      <TextInput
        label="Full Name"
        value={fullname}
        error={isSubmitted && isEmptyFullname()}
        onChangeText={newValue => setFullname(newValue)}
      />
      <HelperText type="error" visible={isSubmitted && isEmptyFullname()}>
        This field is required!
      </HelperText>
      <TextInput
        label="Password"
        secureTextEntry
        value={password}
        error={isSubmitted && isEmptyPassword()}
        onChangeText={newValue => setPassword(newValue)}
      />
      <HelperText type="error" visible={isSubmitted && isEmptyPassword()}>
        This field is required!
      </HelperText>
      <TextInput
        label="Confirm Password"
        secureTextEntry
        value={passwordConf}
        error={isErrorPasswordConf()}
        onChangeText={newValue => setPasswordConf(newValue)}
      />
      <HelperText type="error" visible={isErrorPasswordConf()}>
        {isIncorectPasswordConf()
          ? 'The password does not match'
          : 'This field is required!'}
      </HelperText>
      <Button
        style={styles.componentStyle}
        mode="contained"
        disabled={showUsernameError() || isEmptyUsername()}
        loading={isLoading}
        onPress={() => submitForm()}>
        Register
      </Button>
      <Divider style={margins.v3} />
      <View style={[styles.centerChilds]}>
        <Text>Already have an account? </Text>
        <Button
          mode="text"
          onPress={() => dispatch(accoutSlice.actions.setRegistering(false))}>
          Login
        </Button>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
