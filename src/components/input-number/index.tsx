import { Input } from "@tarojs/components";


import cn from 'classnames';
import './index.scss';
import { useEffect, useState } from "react";

interface InputNumberProps {
  value?: number
  disabled?: boolean
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
}
function InputNumber(props: InputNumberProps) {
  const { value = 1, disabled = false, onChange, min, max, step = 1 } = props;
  const [val, setVal] = useState<number>(value);
  function handleMinus() {
    if (disabled) return;
    const newValue = val - step;
    if (min !== undefined && newValue < min) return;
    if (newValue <= 0) return;
    setVal(newValue);
    onChange?.(newValue);
  }
  function handlePlus() {
    if (disabled) return;
    const newValue = val + step;
    if (max !== undefined && newValue > max) return;
    setVal(newValue);
    onChange?.(newValue);
  }
  function handleInput(e: any) {
    if (disabled) return;
    const newValue = parseInt(e.detail.value);
    if (isNaN(newValue)) return;
    if (min !== undefined && newValue < min) return;
    if (max !== undefined && newValue > max) return;
    console.log('newValue', newValue)
    setVal(newValue);
    onChange?.(newValue);
    setTimeout(() => {
      if (newValue <= 0) {
        setVal(1);
      }
    }, 0);
  }

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (

    <div className='pjl_input_number'>
      <div className={cn('minus', { disabled })} onClick={handleMinus}>-</div>
      <Input
        type='number'
        value={val + ''}
        className={cn('input')}
        disabled={disabled}
        onInput={handleInput}
      />
      <div className={cn('plus', { disabled })} onClick={handlePlus}>+</div>
    </div>
  );
}

export default InputNumber;