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
		<div>
			<h1>Your comment: {comment || 'No comment found'}</h1>
			<form onSubmit={updateComment}>
				<input
					type="text"
					placeholder="Comment"
					value={tempComment}
					onChange={(e) => setTempComment(e.target.value)}
				/>
				<input type="submit" value="Update comment" />
			</form>
		</div>
	)
}

export default Dashboard