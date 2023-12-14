#!/usr/bin/env bash
# Copyright (c) 2022-2023 Datalayer Inc. All rights reserved.
#
# MIT License


# Copyright (c) Datalayer, Inc. https://datalayer.io
# Distributed under the terms of the MIT License.

function kill_port() {
    lsof -i :$1 | grep LISTEN | awk '{print $2}' | xargs kill -9
}

kill_port 3208
kill_port 8686
kill_port 8888

