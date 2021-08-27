export const traverse_moves = (hash_map,from,to) =>{
    let trail = [[...from,'Trail']]
    from = from.join(' ')
    to = to.join(' ')
    for(let key of Object.keys(hash_map).reverse()){
        if(hash_map[key].indexOf(from)>=0){
            from = key
            trail.unshift([...from.split(' '),'Trail'])
        }else if(to == key){
            break
        }
    }return trail
}