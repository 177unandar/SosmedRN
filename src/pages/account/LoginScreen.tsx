import * as React from 'react';
import {View} from 'react-native';
import {
  Button,
  Divider,
  HelperText,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import {postLogin} from '../../api/accountApi';
import {LoginPayload} from '../../api/payload/LoginPayload';
import {BaseResponse} from '../../api/response/BaseResponse';
import {LoginResponse} from '../../api/response/LoginResponse';
import {accoutSlice} from '../../redux/AccountSlice';
import {useAppDispatch} from '../../redux/hook';
import {snackbarSlice} from '../../redux/SnackbarSlice';
import {margins, styles} from '../../styles/styles';
import {saveSessionFromResponse} from '../../utils/storage/UserSession';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isSubmitted, setSubmitted] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const submitForm = async () => {
    setSubmitted(true);
    if (isValidForm()) {
      setLoading(true);
      loggingIn();
    }
  };

  const loggingIn = async () => {
    let result = await dispatch(
      postLogin(new LoginPayload(username, password)),
    );
    let response = result.payload as BaseResponse<LoginResponse | null>;
    if (response.success && response.data !== null) {
      await parseLoginResponse(response.data);
      resetForm();
    } else {
      dispatch(snackbarSlice.actions.error(response.message));
      setLoading(false);
    }
  };

  const parseLoginResponse = async (loginResponse: LoginResponse) => {
    await Promise.all([
      dispatch(accoutSlice.actions.updateUserState(loginResponse.user)),
      await saveSessionFromResponse(loginResponse),
      dispatch(
        snackbarSlice.actions.info(`Welcome ${loginResponse.user.fullname}`),
      ),
    ]);
  };

  const resetForm = () => {
    setSubmitted(false);
    setUsername('');
    setPassword('');
    setLoading(false);
  };

  const isEmptyUsername = (): boolean => {
    return username.length === 0;
  };

  const isEmptyPassword = (): boolean => {
    return password.length === 0;
  };

  const isValidForm = (): boolean => {
    return !isEmptyUsername() && !isEmptyPassword();
  };

  return (
    <View style={[styles.fullWidth]}>
      <Title style={styles.alignCenter}>Login</Title>
      <Divider style={margins.v3} />
      <TextInput
        style={styles.componentStyle}
        label="Username"
        value={username}
        error={isSubmitted && isEmptyUsername()}
        onChangeText={newValue => setUsername(newValue)}
      />
      <HelperText type="error" visible={isSubmitted && isEmptyUsername()}>
        This field is required!
      </HelperText>
      <TextInput
        style={styles.componentStyle}
        label="Password"
        secureTextEntry
        value={password}
        error={isSubmitted && isEmptyPassword()}
        onChangeText={newValue => setPassword(newValue)}
      />
      <HelperText type="error" visible={isSubmitted && isEmptyPassword()}>
        This field is required!
      </HelperText>
      <Button
        style={styles.componentStyle}
        mode="contained"
        loading={isLoading}
        onPress={async () => await submitForm()}>
        Login
      </Button>
      <Divider style={margins.v3} />
      <View style={[styles.centerChilds]}>
        <Text>Don't have an account? </Text>
        <Button
          mode="text"
          onPress={() => dispatch(accoutSlice.actions.setRegistering(true))}>
          Register
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;
