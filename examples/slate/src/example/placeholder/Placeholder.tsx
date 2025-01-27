/*
 * Copyright (c) 2022-2023 Datalayer Inc. All rights reserved.
 *
 * MIT License
 */

import { RenderPlaceholderProps } from "slate-react";

const Placeholder = ({ children, attributes }: RenderPlaceholderProps) => (
  <div {...attributes}>
    <p>{children}</p>
    <pre>
      Use the renderPlaceholder prop to customize rendering of the placeholder
    </pre>
  </div>
)

export default Placeholder;
