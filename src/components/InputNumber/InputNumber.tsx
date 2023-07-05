import { forwardRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  message?: string
  inputClassName?: string
  errorClassName?: string
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function InnerInput(
  {
    className,
    message,
    inputClassName = 'w-full p-3 border rounded outline-none border-gray-300 focus:border-gray-500 focus:shadow text-sm',
    errorClassName = 'h-[1.25rem] text-red-500 mt-1',
    onChange,
    ...rest
  },
  ref
) {
  const handleChages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={className}>
      <input
        ref={ref}
        onChange={handleChages}
        className={inputClassName}
        {...rest}
      />
      <div className={errorClassName}>{message}</div>
    </div>
  )
})

export default InputNumber
