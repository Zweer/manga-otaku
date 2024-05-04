"use client";

import React from "react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";

import config from "@/amplifyconfiguration.json";

Amplify.configure(config, { ssr: true });

export const Auth = ({ children }: { children: React.ReactNode }) => {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
};
