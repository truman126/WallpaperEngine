

function InputAnimated(props) {
    return (

        <div className="relative">
            <input
                value={props.value}
                onChange={(e) => { props.changeFunction(e.target.value) }}
                type={props.type}
                id={props.id}
                className="mb-4 block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 border-gray-300  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlfor={props.id}
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] custom-light-bg px-1 mx-1 peer-focus:px-1 peer-focus:mx-1 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1" >
                {props.label}</label>
        </div>
    )
}

export default InputAnimated;