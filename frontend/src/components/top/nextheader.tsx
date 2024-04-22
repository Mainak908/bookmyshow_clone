import Mainheader from "../Mainheaderlg";
import MobileSubnavbar from "../MobileSubNavbar";
import MobiletopNav from "../Mobiletopnav";
import MediaRendering from "../media-rendering";
import Subheader from "../subheaderlg";

const Nextheader = () => {
  return (
    <>
      <MediaRendering minWidth={null} maxWidth="600">
        <MobiletopNav />
        <MobileSubnavbar />
      </MediaRendering>
      <MediaRendering minWidth="1024" maxWidth={null}>
        <Mainheader />
        <Subheader />
      </MediaRendering>
    </>
  );
};

export default Nextheader;
