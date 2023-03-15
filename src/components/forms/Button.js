import loadingGif from '../images/loading-gif.gif'
export default function Button({
    handleSubmit, name = '', email, password = '', loading
}) {
    return (
        <button 
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={(name && !name) || !email || (password && !password) ||  (password && password.length < 6) }
        >
            {loading ? (<img src={loadingGif} alt="loading" style={{height:"20px"}} />) : ("Submit")}
        </button>
    )
}