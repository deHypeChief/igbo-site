import './style.css'
export function Button(props){
    return(
        <>
            {
                props.admin ? (
                    <button className="adminBttn">{props.children}</button>
                ): (
                    // <button className={props.alt ? "btn_alt" : ""}>{props.children}</button>
                    <div className="mainBttnWrap" onClick={props.action}>
                        <div className="bttnSubWrap">
                            <button className="bttnMain" disabled={props.state || false}>
                                {props.children}
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    )
}