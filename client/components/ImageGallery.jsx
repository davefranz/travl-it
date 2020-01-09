import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "../src/photos";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

// STYLE FOR HORIZONTAL SCROLL
// style = "display: flex; flex-flow: row; overflow-x: auto"
const useStyles = makeStyles({
  horizontal: {
    display: 'flex', 
    flexFlow: 'row',
    overflowX: 'auto'
  },
});
// Can update to toggle photos - potentially add to a different stop
// Can update to rearrange photos with drag and drop
const ImageGallery = props => {
  const classes = useStyles();

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div>
      <Gallery photos={photos} onClick={openLightbox} className={classes.horizontal}/>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

export default ImageGallery;

// export default function Hook() {
//   const classes = useStyles();
//   return <Button className={classes.root}>Hook</Button>;
// }