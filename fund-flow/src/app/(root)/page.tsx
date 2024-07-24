import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";

const Home = () => {
	const loggedIn = {
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@example.com",
	};

	return (
		<section className="home">
			<div className="home-content">
				<header className="home-header">
					<HeaderBox
						type="greeting"
						title="Welcome"
						user={loggedIn?.firstName || "Guest"}
						subtext="Access and manage your automated transactions between accounts efficiently"
					></HeaderBox>
					<TotalBalanceBox
						accounts={[]}
						totalBanks={1}
						totalCurrentBalance={7801.58}
					/>
				</header>
				RECENT TRANSACTIONS
			</div>
			<RightSidebar
				user={loggedIn}
				transactions={[]}
				banks={[{ currentBalance: 900 }, { currentBalance: 123.45 }]}
			></RightSidebar>
		</section>
	);
};

export default Home;
