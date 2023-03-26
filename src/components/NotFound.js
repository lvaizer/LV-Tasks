export default function NotFound(props) {

    const {redirect} = props;

    if (redirect) {
        setTimeout(() => {
            window.location.href = '/'
        }, 2000)
    }

    return (
        <div>NotFound</div>
    )
}
