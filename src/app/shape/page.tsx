"use client";
import React, { useEffect, useState } from "react";
import { Layout, Button, Card, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import "./page.css";


const PageLayout: React.FC = () => {
    const { t } = useTranslation();
    const [isLoaing, setIsLoading] = useState(false);
    
    const [shapes, setShapes] = useState<string[]>([
        "rectangle", "square", "circle",
        "oval", "trapezoid", "parallelogram"
    ]);
    useEffect(() => {
        setIsLoading(true);
    }, []);

    const moveShapeBackward = () => {
        setShapes(prevShapes => {
            const [firstShape, ...restShapes] = prevShapes;
            return [...restShapes, firstShape];
        });
    };

    const moveShapeForward = () => {
        setShapes(prevShapes => {
            const shapesCopy = [...prevShapes];
            const lastShape = shapesCopy.pop()!;
            return [lastShape, ...shapesCopy];
        });
    };

    const swapVertical = () => {
        setShapes(prevShapes => {
            const newShapes = [...prevShapes];
            [newShapes[0], newShapes[1], newShapes[2],
            newShapes[3], newShapes[4], newShapes[5]] =
                [newShapes[3], newShapes[4], newShapes[5],
                newShapes[0], newShapes[1], newShapes[2]];
            return newShapes;
        });
    };

    const handleShapeClick = () => {
        setShapes(prevShapes =>
            prevShapes
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
        );
    };

    return (

        isLoaing ? (
            <div className="page-layout">
            <h1 className="page-title">{t("layout.title1")}</h1>
            <Col span={24} className='page-menu' >
                <Row gutter={[20, 12]} className="button-row" justify="center" align="middle">
                    <Col span={6} style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                        <Button className="control-button" onClick={moveShapeBackward} >
                            <div className="triangle-left"></div>
                            <div className="move-text">{t("layout.move_shape")}</div>
                        </Button>
                    </Col>
                    <Col span={12} className="button-row" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button id="swap-button" className="control-button" onClick={swapVertical}>
                            <Row className="swap-item" gutter={[16, 16]} justify="center" align="middle" >
                                <div className="triangle-up"></div>
                                <div className="triangle-down"></div>
                            </Row>

                            <div className="move-text">{t("layout.move_position")}</div>
                        </Button>
                    </Col>
                    <Col className='button-row' span={6} style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                        <Button className="control-button" onClick={moveShapeForward}>
                            <div className="triangle-right"></div>
                            <div className="move-text">{t("layout.move_shape")}</div>
                        </Button>
                    </Col>
                </Row>



                <Col span={24} className="shape-grid-container">
                    <Row gutter={[16, 16]} className="shape-grid first-row" style={{ marginLeft: "150px" }}>
                        {shapes.slice(0, 3).map((shape, index) => (
                            <Col key={index} xs={8} sm={8} md={8} lg={8}>
                                <Card hoverable className="card-container" onClick={handleShapeClick}>
                                    <div className={`shape ${shape}`}>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <Row gutter={[16, 16]} className="shape-grid second-row" style={{ marginRight: "150px" }} >
                        {shapes.slice(3, 6).map((shape, index) => (
                            <Col key={index} xs={8} sm={8} md={8} lg={8}>
                                <Card hoverable className="card-container" onClick={handleShapeClick}>
                                    <div className={`shape ${shape}`}>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Col>
        </div>
        ) : (
            <div>Loading...</div>
        )
    );
};

export default PageLayout;
