const Input = ({value, setValue, type, title}) => {
    return <div>
        {title}
        <input value={value} onChange={e => setValue(e.target.value)} type={type}/>
    </div>
}

export default Input;