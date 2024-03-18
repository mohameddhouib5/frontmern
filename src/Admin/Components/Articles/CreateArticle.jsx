import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "../../../features/articleSlice";
import { getScategories } from "../../../features/scategorieSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Form, Button, Col, InputGroup, Row } from "react-bootstrap";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";

registerPlugin();

const CreateArticle = () => {
  const [file, setFile] = useState([]);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const [article, setArticle] = useState({});

  const dispatch = useDispatch();
  const { scategories, isLoading } = useSelector(
    (state) => state.storescategories
  );

  useEffect(() => {
    dispatch(getScategories());
  }, [dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      dispatch(createArticle(article))
        .then(() => {
          // handleClose();
          toast.success("Article ajouté", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          console.error(error);
          alert("Erreur ! Insertion non effectuée");
        });
    } catch (error) {
      console.error(error);
    }
  };

  const serverOptions = () => {
    console.log("server pond");
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "mohamed");
        data.append("cloud_name", "dhbqealwn");
        data.append("public_id", file.name);

        axios
          .post("https://api.cloudinary.com/v1_1/dhbqealwn/image/upload", data)

          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setArticle({ ...article, imageart: data.url });
            load(data);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            error("Upload failed");
            abort();
          });
      },
    };
  };

  const handleFileChange = (files) => {
    setFile(files);
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant="success"
        size="sm"
        style={{ margin: 10, left: 10, fontFamily: "Arial" }}
      >
        <i className="fa-solid fa-circle-plus"></i>
        &nbsp; Nouveau
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h1 align="center">Ajout Article</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container w-100 d-flex justify-content-center">
              <div>
                <div className="form mt-3">
                  <Row className="mb-2">
                    <Form.Group as={Col} md="6">
                      <Form.Label>Référence *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Référence"
                        value={article.reference}
                        onChange={(e) =>
                          setArticle({ ...article, reference: e.target.value })
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Saisir Référence Article
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Désignation *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Désignation"
                        value={article.designation}
                        onChange={(e) =>
                          setArticle({
                            ...article,
                            designation: e.target.value,
                          })
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Saisir Désignation
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-2">
                    <Form.Group className="col-md-6">
                      <Form.Label>Marque *</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          required
                          placeholder="Marque"
                          value={article.marque}
                          onChange={(e) =>
                            setArticle({ ...article, marque: e.target.value })
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          Marque Incorrecte
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Prix</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Prix"
                        value={article.prix}
                        onChange={(e) =>
                          setArticle({ ...article, prix: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group className="col-md-6 ">
                      <Form.Label>
                        Qté stock<span className="req-tag">*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        value={article.qtestock}
                        onChange={(e) =>
                          setArticle({ ...article, qtestock: e.target.value })
                        }
                        placeholder="Qté stock"
                      />
                      <Form.Control.Feedback type="invalid">
                        Qté stock Incorrect
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Image</Form.Label>
                      <FilePond
                        files={file}
                        acceptedFileTypes="image/*"
                        onupdatefiles={setFile}
                        allowMultiple={true}
                        server={serverOptions()}
                        name="file"
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="12">
                      <Form.Label>S/Catégorie</Form.Label>
                      <Form.Control
                        as="select"
                        type="select"
                        value={article.scategorieID}
                        onChange={(e) =>
                          setArticle({
                            ...article,
                            scategorieID: e.target.value,
                          })
                        }
                      >
                        <option></option>
                        {!isLoading &&
                          scategories.map((scat) => (
                            <option key={scat._id} value={scat._id}>
                              {scat.nomscategorie}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                  </Row>
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
            <Button type="submit">Enregistrer</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default CreateArticle;
