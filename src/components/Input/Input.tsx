import { type UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  message?: string
  inputClassName?: string
  errorClassName?: string
}

export default function Input({
  className,
  message,
  name,
  register,
  rules,
  inputClassName = 'w-full p-3 border rounded outline-none border-gray-300 focus:border-gray-500 focus:shadow text-sm',
  errorClassName = 'h-[1.25rem] text-red-500 mt-1',
  ...rest
}: Props) {
  const inputRules = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        name={!register && name ? name : undefined}
        className={inputClassName}
        {...inputRules}
        {...rest}
      />
      <div className={errorClassName}>{message}</div>
    </div>
  )
}
