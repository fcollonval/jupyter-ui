/*
 * Copyright (c) 2022-2023 Datalayer Inc. All rights reserved.
 *
 * MIT License
 */

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const joinClasses = (
  ...args: Array<string | boolean | null | undefined>
) => {
  return args.filter(Boolean).join(' ');
}

export default joinClasses;
