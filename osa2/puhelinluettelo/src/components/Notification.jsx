const Notification = ({message}) => {
    const styles = {
        error: {
            color: "red",
            background: "lightgrey",
            fontSize: "20px",
            borderStyle: "solid",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px"
        },
        notification: {
            color: "green",
            background: "lightgrey",
            fontSize: "20px",
            borderStyle: "solid",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px"
        }
    }

    if (message === null) {
        return null
    }

    if (message.error) {
        return (
            <div style={styles.error}>
                {message.data}
            </div>
        )
    } else {
        return (
            <div style={styles.notification}>
                {message.data}
            </div>
        )
    }
};

export default Notification;