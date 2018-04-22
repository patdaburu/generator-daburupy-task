#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Created by pat on 4/21/18
"""
.. currentmodule:: <%= projectName %>.tasks
.. moduleauthor:: <%= authorName %> <<%= authorEmail %>>

This module contains the project's tasks.
"""
import os
import luigi
from luijo.config import FileSystem
from typing import cast


class <%= taskName %>(luigi.Task):
    """
    This is a starter task to use as a template for the creation of your real
    task.  Let's get started! (...and don't forget to update your docstrings!)

    :cvar hello: the string that follows 'Hello' in the output
    :cvar repeat: the number of times the message should be repeated
    """
    hello: luigi.Parameter = luigi.Parameter(default='Pythonista')
    repeat: luigi.Parameter = luigi.IntParameter(default=10)

    def requires(self):
        """
        This task has no requirements.

        :return: an empty iteration
        """
        return []

    def output(self) -> luigi.LocalTarget:
        """
        This task returns a local target object containing the number of 'hello'
        lines that were specified by the :py:attr:`HelloLuigi.repeat` parameter.

        :return: the local target output
        """
        return luigi.LocalTarget(
            os.path.join(
                cast(str, FileSystem().target_home_dir),
                f'{type(self).__name__}.txt'
            )
        )

    def run(self):
        """
        Run the task.
        """
        with self.output().open('w') as f:
            for rpt in range(1, cast(int, self.repeat)+1):
                f.write(f'{rpt}: Hello {self.hello}.\n')

