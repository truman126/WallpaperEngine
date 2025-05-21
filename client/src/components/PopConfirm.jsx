

function PopConfirm(props) {

    function handleAction(e) {
        e.preventDefault;
        props.confirmAction(props.id);
    }

    return (<>
        <button className="btn btn-secondary" onClick={() => document.getElementById(props.id).showModal()}>{props.text}</button>
        <dialog id={props.id} className="modal">

            <div className="modal-box w-100 h-36">
                <h3>Are you sure?</h3>
                <form method="dialog" className="modal-backdrop">
                    <div className="flex justify-end mt-4 space-x-2">{props.id}

                        <button className="btn btn-secondary" onClick={handleAction}>Yes</button>

                        <button className="btn btn-primary" >No</button>


                    </div></form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </>)
}
export default PopConfirm;