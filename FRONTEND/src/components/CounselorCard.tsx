import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'

interface CounselorCardProps {
  name: string | undefined
  grade: number
  gradeCount?: number
  introduce?: string | undefined | null
  onCardClick: () => void
  imgSrc: string | null
}

function CounselorCard({
  name,
  grade,
  gradeCount,
  introduce,
  onCardClick,
  imgSrc,
}: CounselorCardProps) {
  return (
    <Card
      onClick={onCardClick}
      sx={{ width: 300, height: 350 }}
      style={{ boxShadow: '3px 3px #e5e5e5', borderRadius: '5px' }}
    >
      <img
        src={imgSrc || undefined}
        alt=""
        style={{ width: '300px', height: '150px', objectFit: 'scale-down' }}
      />
      <CardContent sx={{ width: 270, height: 70 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ fontFamily: 'TheJamsil5Bold' }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {introduce}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onCardClick} size="small">
          상담사 보기
        </Button>
        <Rating
          name="text-feedback"
          value={grade}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {/* ({gradeCount}) */}
      </CardActions>
    </Card>
  )
}

export default CounselorCard
