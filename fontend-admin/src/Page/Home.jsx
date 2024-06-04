import {
  Breadcrumb,
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
} from "antd";
import "../Style/home.css";

const count = [
  {
    today: "Today’s Sales",
    title: "$53,000",
    persent: "+30%",
    bnb: "bnb2",
  },
  {
    today: "Today’s Users",
    title: "3,200",
    persent: "+20%",
    bnb: "bnb2",
  },
  {
    today: "New Clients",
    title: "+1,200",
    persent: "-20%",
    bnb: "redtext",
  },
  {
    today: "New Orders",
    title: "$13,200",
    persent: "10%",
    bnb: "bnb2",
  },
];

const Home = () => {
  const { Title, Text } = Typography;

  return (
    <div className="container_home">
      <Row className="rowgap-vbox" gutter={[24, 0]}>
        {count.map((c, index) => (
          <Col
            key={index}
            xs={24}
            sm={24}
            md={12}
            lg={6}
            xl={6}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>{c.today}</span>
                    <Title level={3}>
                      {c.title} <small className={c.bnb}>{c.persent}</small>
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">😂😊</div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
