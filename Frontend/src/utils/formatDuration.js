export const formatTime = (seconds = 0 )=>{
    const hrs =Math.floor((seconds/3600))
    const mins = Math.floor((seconds%3600)/60)
    const sec = seconds %60
    if(hrs){
        return `${hrs}h${mins}m${sec}s`
    }
    if(mins){
                return `${mins}m${sec}s`
    }
    if(sec){
                return `${sec}s`

    }
}