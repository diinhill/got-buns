import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

import { Button } from "reactstrap";

import restaurantImage from "../../assets/img/chumbucket.png";
import defaultAvatar from "../../assets/img/plankton.png";

// interface Props {
//   avatar: boolean
//   handlePhoto: (e: React.ChangeEvent<any>) => void
// }

const ImageUpload = ({ avatar, handlePhoto }) => {
  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    avatar ? defaultAvatar : restaurantImage
  );
  const fileInput = React.createRef();
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
      console.log('file:,', file)
      handlePhoto(file)
    }
  };
  const handleSubmit = e => {
    e.preventDefault();

  };
  const handleClick = () => {
    fileInput.current.click();
  };
  // const handleRemove = () => {
  //   setFile(null);
  //   setImagePreviewUrl(props.avatar ? defaultAvatar : restaurantImage);
  //   fileInput.current.value = null;
  // };
  return (
    <div className="fileinput text-center" id='imgfile'>
      <input type="file" name='photo' onChange={handleImageChange}
        ref={fileInput}
      />
      <div
        className={
          "fileinput-new thumbnail img-raised" +
          (avatar ? " img-circle" : "")
        }
      >
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {file === null ? (
          <Button className="btn-round" color="default" onClick={handleClick}>
            {avatar ? "Add Photo" : "Select image"}
          </Button>
        ) : (
          <span>
            <Button className="btn-round" color="default" onClick={handleClick}>
              Change
            </Button>
            {avatar ? <br /> : null}
            {/* <Button color="danger" className="btn-round" onClick={handleRemove}>
              <i className="fa fa-times" /> Remove
            </Button> */}
          </span>
        )}
      </div>
    </div>
  );
}



export default ImageUpload;
