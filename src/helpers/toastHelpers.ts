const messageToastOptions: any = {
    position: 'top-right',
    duration: 3000,
    style: {
        border: "2px solid gray",
        background: 'gray',
        color: '#fff',
    }
}

const errorToastOptions: any = {
    position: 'top-right',
    duration: 4000,
    style: {
        maxWidth: "40vw",
        lineHeight: "0.9",
        border: "2px solid red",
        margin: "1rem"
    }
}

export { messageToastOptions, errorToastOptions }