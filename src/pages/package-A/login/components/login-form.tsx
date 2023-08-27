import { View, Button, Text, Image, Input } from '@tarojs/components';
import Taro, { eventCenter } from '@tarojs/taro';
import { Cache } from '@/constant/cache';

import IconFont from '@/components/icon-font';
import phoneIcon from '@/assets/image/login/phone.png';
import passIcon from '@/assets/image/login/pass.png';
import useUserInfo from '@/store/useUserInfo';


import useLoginStore from '../useLoginStore';
import { LoginWithAccount } from '../webapi';
import './login-form.scss';
import { shallow } from 'zustand/shallow';

export default function LoginForm() {
  const { phone, password, setState, pcLogo, showPassword } = useLoginStore(state => ({
    phone: state.phone,
    password: state.password,
    setState: state.setState,
    pcLogo: state.pcLogo,
    showPassword: state.showPassword
  }),shallow)
  const setUserInfo = useUserInfo(state => state.setUserInfo)
  async function handleSubmmit() {
    const result = await LoginWithAccount({ "customerAccount": "SDVqRS9LM01rWjhYaEdERHJKMHplN3RtdUhsTldySDJZcnAreUVBVlJoNHRFYjJDSG5XZDY4YW10N0J4VHB0TDExZGNmNnRrbmE5elRRMTQ0amtxcTRpLzVhb2FtUWNKS2JZZnRmdlFRZ1Y0VHdNWlFmZ1RkVmp0eUhacTBqWW1CU2xvVTRObUZ6dWF5RkJnQkhZQURRb2s4aWhaU0F5Wkprc1BlU1FWQ0lVPQ==", "customerPassword": "UTNBQkRLUE9ZaFNaOXFnZGlKTW5kR0hvQmx2R2R3S1dIUnJtVCtDWmdMcnYrTE53Z1ppU0tlRFVJUlpxK2NtbEtQMGRndnk2c3FveGs1anpPM3JicjlseWtoak9sWTJqQ2RYKzZ3STRnOVE5a29iRmhRU0pzNUZaRjhOSkdQcVBkYnc4dVIwVnhDMWVreGorcEhEN3J4OXJkbE95ellSQ0J2SEhGKzdEZmNrPQ==", "validate": "" });
    Taro.setStorageSync(Cache.TOKEN, result.token);
    Taro.setStorageSync(Cache.LOGIN_DATA, result);
    setUserInfo(result)
    Taro.showToast({ title: '登录成功' })
    eventCenter.trigger('userCenterRefresh')
    setTimeout(() => {
      Taro.navigateBack()
    }, 1000);
  }
  return (
    <View className='loginForm'>
      <View className='logo-box'>
        <View className='logo-panel'>
          <Image className='logo' mode='aspectFit' src={pcLogo} />
        </View>
      </View>
      <View className='login-info'>
        <View className='form-input'>
          <Image className='l-icon' src={phoneIcon} />
          <Input
            className='int'
            value={phone}
            placeholder='请输入您的手机号'
            onInput={(e) => {
              setState({
                phone: e.detail.value
              })
            }}
            maxlength={11}
            type='number'
          />
        </View>
        <View className='form-input'>
          <Image className='l-icon' src={passIcon} />
          <Input
            className='int'
            value={password}
            placeholder='请输入密码'
            onInput={(e) => {
              setState({
                password: e.detail.value
              })
            }}
            maxlength={16}
            type='text'
            password={!showPassword}
          />
          <View className='r-btn'>
            <IconFont
              value={showPassword ? 'eyes' : 'biyan'}
              size={24}
              onClick={() => {
                setState({
                  showPassword: !showPassword
                })
              }}
            />
          </View>
          <View
            className='forget-password'
            onClick={() => {

            }}
          >
            忘记密码
          </View>
        </View>
      </View>
      <View className='submit-btn' onClick={handleSubmmit}  >
        登录
      </View>
    </View>
  );

}