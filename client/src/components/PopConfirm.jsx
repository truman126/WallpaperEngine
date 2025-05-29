

function PopConfirm(props) {

    function handleAction(e) {
        e.preventDefault;
        props.confirmAction(props.id);
    }

    return (<>
        <span onClick={() => document.getElementById(props.id).showModal()} >{props.children}</span>
        <dialog id={props.id} className="modal">

            <div className="absolute modal-box w-100 h-36">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3>Are you sure?</h3>
               
                    <div className="flex justify-end mt-4 space-x-2">

                        <button className="btn btn-secondary" onClick={handleAction}>Yes</button>

                        <button className="btn btn-primary" >No</button>


                    </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </>)
}
export default PopConfirm;