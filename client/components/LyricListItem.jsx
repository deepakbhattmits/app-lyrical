const LyricListItem=({content,likes,id,handleLike}) =>
    <li className='collection-item likes'>
        {content}
        <div className='vote-box'>
            <i onClick={() => handleLike(id,likes)} className="material-icons right link ">thumb_up</i>
            {likes}
        </div>
    </li>;
export default LyricListItem