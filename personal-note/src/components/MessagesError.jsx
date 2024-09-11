
export const MessagesError = ({message}) => {

 let text = message || `You're not authorized.`
  return (
    <div className="text-center text-red-500 text-2xl mt-1">
      {text}
    </div>
  )
}
