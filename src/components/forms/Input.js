export default function Input({value, setValue, label, type}){
    return (
        <div className="form-group mb-3">
            <label>{label}</label>
            <input 
                value={value}
                onChange={(e) => { setValue(e.target.value)}}
                type={type}
                className="form-control"
                placeholder={`Enter ${label}`}
            />
        </div>
    )
}