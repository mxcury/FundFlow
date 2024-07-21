import HeaderBox from "@/components/ui/HeaderBox";

const Home = () => {
	const loggedIn = { firstName: "John", lastName: "Doe" };

	return (
		<section className="home">
			<div className="home-content">
				<header className="home-header">
					<HeaderBox
						type="greeting"
						title="Welcome"
						user={loggedIn?.firstName || "Guest"}
						subtext="Access and manage your automated transactions between accounts effciently"
					></HeaderBox>
				</header>
			</div>
		</section>
	);
};

export default Home;
