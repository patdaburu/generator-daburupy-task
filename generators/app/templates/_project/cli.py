#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
.. currentmodule:: <%= projectName %>.cli
.. moduleauthor:: <%= authorName %> <<%= authorEmail %>>

This is the entry point for the command-line interface (CLI) application.  It
can be used as a handy facility for running the task from a command line.

.. note::

    To learn more about Click visit the
    `project website <http://click.pocoo.org/5/>`_.  There is also a very
    helpful `tutorial video <https://www.youtube.com/watch?v=kNke39OZ2k0>`_.

    To learn more about running Luigi, visit the Luigi project's
    `Read-The-Docs <http://luigi.readthedocs.io/en/stable/>`_ page.
"""
import multiprocessing
import click
import luigi
from luijo.config import find_configs
from .tasks import <%= taskName %>
from typing import Iterable


class Info(object):
    """
    This is an information object that can be used to pass data between CLI
    functions.
    """
    def __init__(self):  # Note that this object must have an empty constructor.
        self.workers: int
        self.config: str


# pass_info is a decorator for functions that pass 'Info' objects.
#: pylint: disable=invalid-name
pass_info = click.make_pass_decorator(
    Info,
    ensure=True
)


def get_tasks() -> Iterable[luigi.Task]:
    """
    Create the tasks that will be used by the `run` and `submit` commands.

    :param info: cli information
    :return: the tasks to run
    """
    return [
        <%= taskName %>()
    ]


# Change the options to below to suit the actual options for your task (or
# tasks).
@click.group()
@click.option('--workers',
              type=int,
              default=multiprocessing.cpu_count(),
              help='the number of workers (defaults to the CPU count)')
@pass_info
def cli(info: Info,
        workers: int):
    """
    Run the <%= taskName %> task.
    """
    info.workers = workers


@cli.command()
@pass_info
def run(info: Info):
    """
    Run tasks on the local scheduler.

    :param info: cli information
    """
    luigi.build(
        get_tasks(),
        no_lock=False,
        local_scheduler=True,
        workers=info.workers
    )


@cli.command()
@pass_info
def submit(info: Info):
    """
    Submit tasks to a Luigi daemon.

    :param info: cli information
    :return:
    """
    luigi.build(
        get_tasks(),
        workers=info.workers
    )


@cli.command()
def findcfg():
    """
    Find the Luigi configuration files on the system.
    """
    candidates = find_configs()
    if not candidates:
        click.echo(
            click.style(
                'No candidate config files were found.',
                fg='yellow')
        )
    else:
        for candidate in candidates:
            click.echo(click.style(candidate, fg='blue'))
