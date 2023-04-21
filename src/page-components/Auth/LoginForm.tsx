import { memo, FC, useMemo } from 'react';
import { useFormik } from 'formik';
import { Form, Input, Button, Checkbox } from 'antd';
import { FormattedMessage } from 'react-intl';

import { LoginPayload } from 'src/hooks/useAuth';
import { checkMarineMaxAccount } from 'src/utils/auth';
import { trns } from './messages';

const initialValues = {
  username: '',
  password: '',
};

interface Props {
  onSubmit: (payload: LoginPayload) => void;
}

const LoginForm: FC<Props> = memo(({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      onSubmit(values as LoginPayload);
    },
    enableReinitialize: true,
  });

  const isMarineMaxAccount = useMemo(() => {
    return checkMarineMaxAccount(formik.values.username);
  }, [formik.values.username]);

  return (
    <Form
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={formik.handleSubmit}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
    >
      <Form.Item
        label="Email or Username"
        name="username"
        rules={[
          { required: true, message: 'Please input your email or username' },
        ]}
      >
        <Input
          placeholder="Email or Username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
      </Form.Item>

      {
        !isMarineMaxAccount && (
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: !isMarineMaxAccount, message: 'Please input your password' }]}
          >
            <Input.Password
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Form.Item>
        )
      }

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>
          <FormattedMessage {...trns.staySignedIn} />
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          <FormattedMessage {...trns.login} />
        </Button>
      </Form.Item>
    </Form>
  );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
