export const Button = (props) => {
    return <button className="my-1 mx-0.5 inline-block text-white bg-green-600 text-center border rounded py-1.5 px-3 border-white" type={props.type} name={props.name} onClick={props.onClick}>{props.text}</button>
}