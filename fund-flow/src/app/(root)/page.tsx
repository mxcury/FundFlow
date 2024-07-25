import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async () => {
	const loggedIn = await getLoggedInUser();

	return (
		<section className="home">
			<div className="home-content">
				<header className="home-header">
					<HeaderBox
						type="greeting"
						title="Welcome"
						user={loggedIn?.name ? loggedIn.name.split(" ")[0] : "Guest"}
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
