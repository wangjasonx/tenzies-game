
export default function Die(props) {

    return (
        <div className={props.diceObject.isHeld ? "held die" : "die"} onClick={(event) => props.holdDie(props.diceObject.id)}>
            <h1 className="die-num">{props.diceObject.value}</h1>
        </div>
    )
}