import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../../utils/theme';
// import { useAuthContext } from "../../context";
// import { VariationContext } from "../../context/variation/VariationContext";
import { useForm } from 'react-hook-form';
import { captureException } from 'sentry-expo';
import Input from '../../components/primary/Input';
import Button from '../../components/primary/Button';
import Block from '../../components/primary/Block';
import Header from '../../components/Header';
import Text from '../../components/Text';

const ResetPassword = ({ navigation }) => {
  // const auth = useAuthContext();
  const { register, setValue, getValues, handleSubmit, errors } = useForm();

  // const { resetPin } = auth;

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setSending(true);
    // const res = await resetPin(data);
    // if (res.status === "success") {
    //   setMessage("Pin reset Successfully");
    //   navigation.navigate("Login");
    // } else {
    //   setMessage(res.message);
    // }
    setSending(false);
  };
  useEffect(() => {
    register({ name: 'newPin' }, { required: 'please set a new pin' });
    register(
      { name: 'confirmPin' },
      {
        required: 'please enter your pin again',
        validate: (value) => value === getValues(),
      }
    );
  }, [register, getValues]);

  return (
    <Block background>
      <Header backTitle='Reset Password' />
      <Block>
        <Block paddingHorizontal={SIZES.padding} space='between'>
          <Text secondary>{message}</Text>
          <Input
            label='New Pin'
            secureTextEntry
            maxLength={4}
            keyboardType='number-pad'
            onChangeText={(text) => setValue('newPin', text)}
            error={errors.newPin}
          />
          <Input
            label='Confirm New Pin'
            maxLength={4}
            secureTextEntry
            keyboardType='number-pad'
            onChangeText={(text) => setValue('confirmPin', text)}
            error={errors.confirmPin}
          />
          <Block middle>
            {sending ? (
              <ActivityIndicator animating size='large' />
            ) : (
              <Button marginVertical={SIZES.padding} primary onPress={handleSubmit(onSubmit)}>
                <Text white center>
                  Reset Password
                </Text>
              </Button>
            )}
          </Block>
        </Block>
        <Block flex={0} inactive center middle row>
          <Text muted small>
            Already have an account?
          </Text>
          <Button
            transparent
            marginHorizontal={SIZES.base}
            onPress={() => navigation.navigate('Login')}>
            <Text primary small>
              Log In
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default ResetPassword;
