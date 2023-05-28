import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Steps } from "antd";

import { AppTest } from "./app.styles";
import { BaseModal } from "./components/BaseModal";

function App() {
  const description = "This is a description.";

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (): void => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <AppTest>
      <Steps
        current={1}
        items={[
          {
            title: "Finished",
            description,
          },
          {
            title: "In Progress",
            description,
            subTitle: "Left 00:00:08",
          },
          {
            title: "Waiting",
            description,
          },
        ]}
      />

      <Button onClick={() => showModal()}>Click Modal</Button>
      <BaseModal
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
      />
    </AppTest>
  );
}

export default App;
