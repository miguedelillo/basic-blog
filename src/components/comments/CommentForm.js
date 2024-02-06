import { useState } from "react";

const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    inicialText = "",
    handleCancel, }) => {
    const [text, setText] = useState(inicialText);
    const onSubmit = event => {
        event.preventDefault()
        handleSubmit(text)
        setText("")

    }
    const isTextAreaDisabled = text.length === 0;
    return (
        <form onSubmit={onSubmit}>
            <textarea
                className="comment-form-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button className="comment-form-button" disabled={isTextAreaDisabled}>{submitLabel}</button>
            {hasCancelButton &&
                (<button
                    type="button" //Para que no submitee el form.
                    className="comment-form-button comment-form-cancel-button"
                    onClick={handleCancel}> Cancel </button>)
            }
        </form>
    )
}

export default CommentForm;