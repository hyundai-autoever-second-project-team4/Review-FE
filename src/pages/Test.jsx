import React from 'react'
import MovieCard from '../components/MovieCard/MovieCard'

function Test (){
    const img = "https://i.namu.wiki/i/AzwNiCjLoso4kGNVLOaOXMAomI2hn_44R4NiDfCb1y2fy-z_GvZy_hnvWhh-bxQnGgXcXlhWIpufoZA6wfDz9g.webp"
    const title="인시디어스:빨간문"
    const year = 2024
    const country = "미국"
    const genre =["공포", "호러"]
    
  return (
    <>
    
    
    <MovieCard title={title} poster={img} year={year} country={country}/>
    <MovieCard title={title} poster={img} year={year} country={country} genre={genre}/>
    <MovieCard title={title} poster={img} year={year} country={country} genre={genre}/>
    
    {/* <MovieCard title={ㄴㄹㄴㅇㄹ} poster={"https://i.namu.wiki/i/AzwNiCjLoso4kGNVLOaOXMAomI2hn_44R4NiDfCb1y2fy-z_GvZy_hnvWhh-bxQnGgXcXlhWIpufoZA6wfDz9g.webp"}/>
    <MovieCard title={"sfd"} poster={"https://i.namu.wiki/i/AzwNiCjLoso4kGNVLOaOXMAomI2hn_44R4NiDfCb1y2fy-z_GvZy_hnvWhh-bxQnGgXcXlhWIpufoZA6wfDz9g.webp"}/> */}
    </>
  )
}

export default Test


