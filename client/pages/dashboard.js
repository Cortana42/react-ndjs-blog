import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import {useRouter} from 'next/router'

const Dashboard = () => {
	const router = useRouter()
	const [comment, setComment] = useState('')
	const [tempComment, setTempComment] = useState('')

	async function populateComment() {
		const req = await fetch('http://localhost:3000/api/comment', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setComment(data.comment)
		} else {
			alert(data.error)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				router.replace('/login')
			} else {
				populateComment()
			}
		}
	}, [])

	async function updateComment(event) {
		event.preventDefault()

		const req = await fetch('http://localhost:3000/api/comment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				comment: tempComment,
			}),
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setComment(tempComment)
			setTempComment('')
		} else {
			alert(data.error)
		}
	}

	return (
		<div className='marg'>
			<h1>Your comment:</h1>
			<form onSubmit={updateComment}>
				<textarea className='comment'
					type="text"
					placeholder="Comment"
					value={tempComment}
					onChange={(e) => setTempComment(e.target.value)}
				/>
				<br></br>
				<br></br>
				<input type="submit" value="Update comment" />
			</form>
			<p>{comment || 'No comment found'}</p>
		</div>
	)
}

export default Dashboard