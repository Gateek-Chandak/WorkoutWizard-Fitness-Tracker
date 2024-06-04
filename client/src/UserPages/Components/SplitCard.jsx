const SplitCard = ( {name, handleSelectedSplit} ) => {

    const handleClick = () => {
        handleSelectedSplit(name)
    }

    return ( 
        <button className="text-middle" onClick={handleClick}>{name}</button>
     );
}
 
export default SplitCard;