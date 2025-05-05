import type { LpComment } from "../../types/lp"

interface LpCommentProps {
    comment: LpComment;
}

const LpComment = ({comment} : LpCommentProps) => {
  return (
    <div key={comment.id}>
        {comment.content}
    </div>
  )
}

export default LpComment;
