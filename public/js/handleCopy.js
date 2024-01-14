function handleCopy(target){
    const value = target.textContent;
    navigator.clipboard.writeText(value)
    .then(()=>{
        alert("text copied to clipboard")
    })
}