

interface ErrorProps {
    message: string
}


const Error = ({message}:ErrorProps) => {
  return (
    <div>{message + " Failed To Fetch"}</div>
  )
}

export default Error