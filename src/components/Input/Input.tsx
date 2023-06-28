import { type UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props {
  className?: string
  name: string
  type: React.HTMLInputTypeAttribute
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  rules?: RegisterOptions
  message?: string
  placeholder?: string
}

export default function Input({
  className,
  type,
  message,
  name,
  register,
  rules,
  placeholder
}: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        className='border-sm outlite-none w-full border border-gray-300 p-3 focus:shadow-sm'
        {...register(name, rules)}
      />
      <div className='mt-1 min-h-[1.25rem] text-red-400'>{message}</div>
    </div>
  )
}
