import moment from "moment";
import React from "react";
import { View } from "react-native";
import { Caption, Card, Divider, Text, Title } from "react-native-paper";
import { Comment } from "../../models/Comment";
import { margins, space2 } from "../../styles/styles";

type Props = {
    comment: Comment;
};

const userTextSize = 11;

export const CommentItem: React.FC<Props> = ({ comment }) => {
    return (
        <Card mode="outlined" style={[margins.v1, { padding: 5 }]}>
            <Text style={{ fontSize: userTextSize, fontWeight: "600" }}>{comment.fullname}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <Text style={{ fontSize: userTextSize, fontWeight: "bold" }}>{comment.username}</Text>
                <Text style={{ marginHorizontal: space2, fontSize: 10, fontWeight: '100' }}>
                    {moment(comment.created_at).fromNow()}
                </Text>
            </View>
            <Divider />
            <Caption>
                {comment.comment.trim()}
            </Caption>
        </Card>);
}