import React, { useState } from 'react';
import {
	View, Button, TextInput, Text,
	FlatList, StyleSheet, TouchableOpacity
} from 'react-native';

const data = [
	{
		id: 1, title: 'Zahra',
		content: `Air University 2021-2025
Bachelor of Computer Science CGPA: 3.11
– Currently enrolled in 6th semester
• Kips College, Multan 2019-2021
Board of Secondary Education, Multan Percentage: 65
• Nishat High School, Multan 2017-2019
Board of Secondary Education, Multan Percentage: 85
` },
	{
		id: 2, title: 'Course-Work',
		content: `Coursework: Programming fundamentals, Object Oriented Programming (OOP), Database System, Operating
system, Mobile Computing, Full Stack Web Development, Data Structures and Algorithms, Design Analysis` },
	// Add more blog posts here
];

const App = () => {
	const [selectedPost, setSelectedPost] = useState(null);
	const [newPostTitle, setNewPostTitle] = useState('');
	const [newPostContent, setNewPostContent] = useState('');
	const [posts, setPosts] = useState(data);
	const [error, setError] = useState('');

	const addNewPost = () => {
		if (newPostTitle.trim() === '' ||
			newPostContent.trim() === '') {
			setError('Title and content cannot be empty');
			return;
		} else {
			setError('');
		}

		const id = posts.length + 1;
		const newPost =
		{
			id, title: newPostTitle,
			content: newPostContent
		};
		setPosts([...posts, newPost]);
		setNewPostTitle('');
		setNewPostContent('');
	};

	const deletePost = (postId) => {
		const updatedPosts =
			posts.filter(
				(post) =>
					post.id !== postId);
		setPosts(updatedPosts);
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity
			onPress={() => setSelectedPost(item)}>
			<View style={styles.postContainer}>
				<Text style={styles.postTitle}>
					{item.title}
				</Text>
				<Text style={styles.postContent}>
					{item.content}
				</Text>
				<TouchableOpacity style={styles.deleteButton}
					onPress={() => deletePost(item.id)}>
					<Text style={styles.deleteButtonText}>
						Delete
					</Text>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={styles.headingContainer}>
				<Text style={styles.heading}>Blog App</Text>
			</View>
			{!selectedPost ? (
				<FlatList
					data={posts}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
				/>
			) : (
				<View style={styles.selectedPostContainer}>
					<Text style={styles.selectedPostTitle}>
						{selectedPost.title}
					</Text>
					<Text style={styles.selectedPostContent}>
						{selectedPost.content}
					</Text>
					<TouchableOpacity style={styles.backButton}
						onPress={() => setSelectedPost(null)}>
						<Text style={styles.backButtonText}>
							Back
						</Text>
					</TouchableOpacity>
				</View>
			)}
			{selectedPost === null && (
				<View style={styles.formContainer}>
					{error !== '' &&
						<Text style={styles.errorText}>
							{error}
						</Text>}
					<TextInput
						style={styles.input}
						placeholder="Enter Title"
						value={newPostTitle}
						onChangeText={setNewPostTitle}
					/>
					<TextInput
						style={[styles.input, styles.textArea]}
						placeholder="Enter Content"
						value={newPostContent}
						onChangeText={setNewPostContent}
						multiline={true}
					/>
					<Button title="Add New Post"
						onPress={() => addNewPost()} />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		paddingHorizontal: 20,
	},
	headingContainer: {
		backgroundColor: '#3498db',
		padding: 10,
		borderRadius: 10,
		marginBottom: 20,
    color: 'coral',
	},

	heading: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'yellow',
	},
	postContainer: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 20,
		marginBottom: 20,
		borderRadius: 10,
    color: 'yellow',
	},
	postTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
    color: 'mediumvioletred',
	},
	postContent: {
		fontSize: 16,
    color: 'lightseagreen',
	},
	deleteButton: {
		alignSelf: 'flex-end',
		marginTop: 10,
	},
	deleteButtonText: {
		color: 'red',
    
	},
	selectedPostContainer: {
		padding: 20,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 10,
    color:"orange",
   
	},
	selectedPostTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
    color:"orange",
    
	},
	selectedPostContent: {
		fontSize: 16,
    color:"orange",
	},
	backButton: {
		alignSelf: 'flex-end',
		marginTop: 20,
    
	},
	backButtonText: {
		
		fontSize: 16,
	},
	formContainer: {
		padding: 20,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 10,
		marginBottom: 20,
    color: 'orange',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
		borderRadius: 5,
    color:"purple"
	},
	textArea: {
		height: 100,
    color:"purple"
	},
	errorText: {
		color: 'red',
		textAlign: 'center',
		marginBottom: 10,
	},
});

export default App;
