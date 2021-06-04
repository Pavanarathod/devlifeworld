import Feed from "../components/Feed";
import Groups from "../components/Groups";
import Navbar from "../components/Navbar";
import Uploader from "../components/Uploader";

const Homepage = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <div className="w-full sm:mt-3">
        <div className="sm:flex sm:justify-between sm:w-3/4 sm:ml-auto sm:mr-auto">
          <div className="sm:w-3/5">
            <Uploader />
            <div className="hidden sm:block">
              <Feed />
            </div>
          </div>
          <div className=" text-white sm:flex-1 sm:mt-2">
            <Groups />
            <div className="sm:hidden">
              <Feed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
