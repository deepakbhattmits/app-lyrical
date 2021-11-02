import {Link, useParams} from "react-router-dom";
import {useQuery} from '@apollo/client'
import LoadingSpinner from "./reusable/LoadingSpinner";
import {FETCH_SONG} from "../queries";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

const SongDetail=() => {
    const {id}=useParams();
    const {data,loading,error}=useQuery(FETCH_SONG, {
    variables: { id },
    })
     if (loading) return <LoadingSpinner/>;
  if (error) return `Error! ${error?.message}`;
    return <div className='collection-item'>
      <Link to='/'>Back </Link>
      <h3>{data?.song?.title}</h3>
      <LyricList datas={data?.song?.lyrics} id={id}/>
      
      <LyricCreate songId={id}/>
           
</div>}
    
export default SongDetail